/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

const Pure = ({ template, onClick }) => {
  return (
    <img
      key={template.id}
      alt={template.name}
      src={template.url}
      style={{ width: 200 }}
      onClick={onClick}
    />
  );
};

export default Pure;
