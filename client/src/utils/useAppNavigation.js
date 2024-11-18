import { useNavigate } from 'react-router-dom';

const useAppNavigate = () => {
  const navigate = useNavigate();

  return (path) => {
    navigate(path);
  };
};

export default useAppNavigate;
