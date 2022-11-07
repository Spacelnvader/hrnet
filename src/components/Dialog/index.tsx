import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import './style.scss';

type DialogProps = {
  text: string,
  showDialog: boolean,
  duration?: number,
  onClose: CallableFunction
}

const Dialog: FunctionComponent<DialogProps> = ({ text, showDialog, duration = 500, onClose }) => {
  const [displayDialog, setDisplayDialog] = useState<boolean>(showDialog)

  useEffect(() => {
    if(showDialog) {
      setDisplayDialog(true)
    } else {
      const timer = setTimeout(() => {
        setDisplayDialog(false)
        clearTimeout(timer)
      }, duration)  
    }
  }, [showDialog, duration])

  return (
    <div 
      className={`dialog${ !showDialog ? ' hide' : '' }`} 
      style={{
        display: displayDialog ? 'flex' : 'none',
        '--duration': duration + 'ms'
      } as CSSProperties}
    >
      { displayDialog ? (
        <div className={`dialog__modal${ !showDialog ? ' hide' : '' }`}>
          <p>{text}</p>
          <i onClick={() => onClose()}><FontAwesomeIcon icon={faCircleXmark}/></i>
        </div>
      ) : null }
    </div>
  );
}

export default Dialog;
