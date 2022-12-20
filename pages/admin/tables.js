import React, { useMemo } from "react";
import Link from "next/dist/client/link.js";

// components
import CardTable from "../components/Cards/CardTable.js";
import Table, {
	AvatarCell,
	SelectColumnFilter,
	StatusPill,
} from "../components/Tables/Table.js";

// layout for page
import Admin from "../layouts/Admin.js";

// data
import rowData from "../../public/MOCK_DATA.json";

export default function Tables() {
	const column = [
		{
			Header: "#id",
			accessor: "id",
		},
		{
			Header: "Job Name",
			accessor: "job_name",
		},
		{
			Header: "Status",
			accessor: "status",
			// statusbar: StatusPill
		},
		{
			Header: "Delivery Date",
			accessor: "delivery_date",
			Filter: SelectColumnFilter, // new
			filter: "includes2",
		},
		{
			Header: "Created On",
			accessor: "created_date",
			Filter: SelectColumnFilter, // new
			filter: "includes",
		},
	];
	const columns = useMemo(() => column, []);

	const data = useMemo(() => rowData, []);

	return (
		<>
			<div className="flex flex-wrap mt-4">
				<div className="w-full mb-12 -mt-10 px-12 md:px-12">
					{/* <CardTable /> */}
					<Table columns={columns} data={data} />
				</div>

				{/* <div className="w-full mb-12 px-4">
					<CardTable color="dark" />
				</div> */}
			</div>
		</>
	);
}

Tables.layout = Admin;
