import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useGetDevice } from '@/hooks/useGetDevice';
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery';
import { getUserbyDeviceId } from '@/utils/queries/users';
import { useEffect } from 'react';
import { UserInfoT } from '@/types';
import { Loader } from '@mantine/core';
import { useAppDispatch } from '@/store';
import { setLoading, setUser } from '@/store/GlobalSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const params = useParams();
  const deviceInfo = useGetDevice();
  const { data, loading, executeQuery } = useSupabaseQuery<UserInfoT>();
  const dispatch = useAppDispatch();

  const fetchUser = async (deviceId: string) => {
    await executeQuery(() => getUserbyDeviceId(deviceId));
  };

  useEffect(() => {
    if (deviceInfo.deviceId) {
      fetchUser(deviceInfo.deviceId);
    }
  }, [deviceInfo.deviceId]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  useEffect(() => {
    dispatch(setUser(data?.user ?? null));
  }, [data?.user]);

  if (loading) {
    return <Loader />;
  }

  if (!data?.roomInfo && location.pathname !== '/') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (data && data.isPlaying && data.roomInfo && location.pathname !== `/play/${params.code}`) {
    return <Navigate to={`/play/${data.roomInfo.code}`} replace />;
  }

  if (data && !data.isPlaying && data.roomInfo && location.pathname !== `/lobby/${params.code}`) {
    return <Navigate to={`/lobby/${data.roomInfo.code}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 