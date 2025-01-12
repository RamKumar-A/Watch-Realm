import styles from './Spinner.module.css';

function Spinner({ small = false, background }) {
  return (
    <div
      style={{
        '--loader-size': small && '10px',
        '--loader-background': background && '#74293D',
      }}
      className={styles.loader}
    ></div>
  );
}

export default Spinner;
