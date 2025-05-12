function AccountSectionTemplate({ icon, title, children, button, subTitle }) {
  return (
    <div className="bg-secondary-default shadow-lg border border-highlight-default rounded-lg p-6 grid">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <span className="opacity-75">{icon}</span>
        <span>{title}</span>
      </h2>
      <p className="opacity-60 mt-2">{subTitle}</p>
      <div className="place-self-end">{button}</div>
      {children}
    </div>
  );
}

export default AccountSectionTemplate;
