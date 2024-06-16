import { useDispatch } from 'react-redux';
import { onClose } from '../../../store/slices/modalSlice';

export const useModal = () => {
    const dispatch = useDispatch();

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            dispatch(onClose());
        }
    };

    return { handleModalClick };
};