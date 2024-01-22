import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../sass/components/_button.scss';

interface IButton {
  text: string;
  onClick?: (e: any) => void;
  className?: string;
  icon?: any
}

export const Button = ({ text, onClick, className, icon }: IButton) => {
  return (
    <button onClick={onClick} className={'button ' + className}><FontAwesomeIcon className='button-responsive-icon' icon={icon as IconProp} />{text}</button>
  );
};
