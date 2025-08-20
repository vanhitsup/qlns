import Table from "@/UI/Table";

const ReportTable = ({ columns, list, loading, children, nestedRowKey }) => {
  return (
    <>
      <div className='mt-2'>
        <Table
          nestedRowKey={nestedRowKey}
          loading={loading}
          columns={columns}
          data={
            !!list?.length && list.map((item) => ({ ...item, key: item.id }))
          }
          scroll={{ y: window.innerHeight - 350 }}
        />
      </div>
      {children && children}
    </>
  );
};
export default ReportTable;
