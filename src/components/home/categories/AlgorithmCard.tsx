import { faArrowRightLong } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classes from './AlgorithmCard.module.scss';

interface Props {
    link: string;
    image: string;
    title: string;
}

const AlgorithmCard: React.FC<Props> = ({ link, image, title }) => {
    return (
        <article className={classes.algorithm}>
            <img src={image} alt={title} />
            <div className={classes.content}>
                <h3>{title}</h3>
                <Link to={link} className={classes.btn}>
                    <span>
                        Try Out{'  '}
                        <FontAwesomeIcon
                            className={classes.icon}
                            icon={faArrowRightLong as any}
                        />
                    </span>
                </Link>
            </div>
        </article>
    );
};

export default AlgorithmCard;
