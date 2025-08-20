import { Select, Tag } from "antd";

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}>
      {label}
    </Tag>
  );
};

const ColVisibilityDropdown = ({ options, columns, columnsToShowHandler }) => {
  const localOptions = options.filter((option) => option.title?.length >= 2);
  const modOptions = localOptions.map((option) => {
    return {
      id: option.id,
      value: option.title,
    };
  });

  const defaultValue = modOptions.map((option) => {
    return option.value;
  });

  const handleChange = (selectedCols) => {
    const columnsToShow = columns.filter((column) => {
      return !!selectedCols.find((selectedCol) => column.title === selectedCol);
    });

    if (columns.find((item) => item?.title === "")) {
      columnsToShow.push(columns.find((item) => item?.title === ""));
    }
    columnsToShowHandler(columnsToShow);
  };

  return (
    <div className="min-w-[110px] md:max-w-[165px] w-1/2 md:w-auto">
      <Select
        mode="multiple"
        tagRender={tagRender}
        defaultValue={defaultValue}
        maxTagCount={0}
        options={modOptions}
        maxTagPlaceholder="Columns"
        placeholder="Column Visibility"
        onChange={handleChange}
        popupClassName="w-[200px]"
      />
    </div>
  );
};
export default ColVisibilityDropdown;
