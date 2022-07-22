import { useState } from 'react';
import Modal from './Modal';
import classes from './IntroModal.module.scss';

export enum Theme {
    Primary = 'primary',
    Secondary = 'secondary',
}

interface Props {
    onClose: () => void;
    introJsxList: React.ReactNode[];
}

const IntroModal: React.FC<Props> = (props) => {
    const { onClose, introJsxList } = props;
    // Index
    const [pageIndex, setPageIndex] = useState(0);

    const numPages = introJsxList.length;

    const pageHandler = (dir: number) => {
        if (pageIndex === 0 && dir < 0) return;
        if (pageIndex === numPages - 1 && dir > 0) return;
        setPageIndex((prev) => prev + dir);
    };

    return (
        <Modal onClose={onClose}>
            <div className={classes['page-nav']}>
                {pageIndex + 1}/{numPages}
            </div>
            {introJsxList[pageIndex]}
            <div className={classes.buttons}>
                <div className={classes['left-buttons']}>
                    <button onClick={onClose}>Close</button>
                </div>
                <div className={classes['right-buttons']}>
                    <button
                        disabled={pageIndex === 0 ? true : false}
                        onClick={pageHandler.bind(null, -1)}
                    >
                        Previous
                    </button>
                    <button
                        disabled={pageIndex === numPages - 1 ? true : false}
                        onClick={pageHandler.bind(null, 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default IntroModal;
