import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={`${styles.loaderContainer} `}>
      <div
        className={`${styles.loader} absolute top-[48.5%] left-[48.5%] `}
      ></div>
    </div>
  );
}

export default Loader;
