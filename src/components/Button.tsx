import '../sass/components/_button.scss';

interface IButton {
  text: string;
  onClick?: (e: any) => void;
  className?: string;
}

export const Button = ({ text, onClick, className }: IButton) => {
  return (
    <button onClick={onClick} className={'button ' + className}>{text}</button>
  );
};
