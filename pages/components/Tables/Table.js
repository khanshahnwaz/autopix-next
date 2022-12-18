import React, { useMemo, useState } from "react";
import {
	useTable,
	useFilters,
	useGlobalFilter,
	useAsyncDebounce,
	useSortBy,
	usePagination,
} from "react-table";
import {
	ChevronDoubleLeftIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronDoubleRightIcon,
} from "@heroicons/react/24/solid";
import { Button, PageButton } from "../shared/Button";
import { classNames } from "../shared/Utils";
import { SortIcon, SortUpIcon, SortDownIcon } from "../shared/Icons";
import PropTypes from "prop-types";

// Define a default UI for filtering
function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);
	const onChange = (value) => {
		setGlobalFilter(value || undefined);
		useAsyncDebounce((value) => {
			setGlobalFilter(value || undefined);
		}, 500);
	};

	return (
		<div className="flex !gap-10 items-baseline justify-center mx-10 px-5">
			<span className="text-gray-700 font-bold px-3">Search: </span>
			<input
				type="text"
				className="!mx-5 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				value={value || ""}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} records...`}
			/>
		</div>
	);
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	// Render a multi-select box
	return (
		<label className="flex gap-x-2 items-baseline">
			<span className="text-gray-700">{render("Header")}: </span>
			<select
				className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				name={id}
				id={id}
				value={filterValue}
				onChange={(e) => {
					setFilter(e.target.value || undefined);
				}}
			>
				<option value="">All</option>
				{options.map((option, i) => (
					<option key={i} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
}
export function StatusPill({ value }) {
	const status = value ? value.toLowerCase() : "unknown";

	return (
		<span
			className={classNames(
				"px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
				status.startsWith("active") ? "bg-green-100 text-green-800" : null,
				status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
				status.startsWith("offline") ? "bg-red-100 text-red-800" : null
			)}
		>
			{status}
		</span>
	);
}

export function AvatarCell({ value, column, row }) {
	return (
		<div className="flex items-center">
			<div className="flex-shrink-0 h-10 w-10">
				<img
					className="h-10 w-10 rounded-full"
					src={row.original[column.imgAccessor]}
					alt=""
				/>
			</div>
			<div className="ml-4">
				<div className="text-sm font-medium text-gray-900">{value}</div>
				<div className="text-sm text-gray-500">
					{row.original[column.emailAccessor]}
				</div>
			</div>
		</div>
	);
}
const Table = ({ columns, data, color }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<div
			className={
				"relative flex flex-col gap-10 min-w-0 break-words w-full mb-6 shadow-lg rounded " +
				(color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
			}
		>
			{/* title and filter */}
			<div className="rounded-t mb-0 px-5 py-3 border-0">
				<div className="">
					<div className="relative w-full px-4 max-w-full flex items-center justify-between">
						{/* <h3
							className={
								"font-semibold text-lg " +
								(color === "light" ? "text-blueGray-700" : "text-white")
							}
						>
							Card Tables
						</h3> */}
						{/* search/filter */}
						{/* <div className="flex flex-row items-center justify-center !gap-10"> */}
						<div className="">
							<GlobalFilter
								preGlobalFilteredRows={preGlobalFilteredRows}
								globalFilter={state.globalFilter}
								setGlobalFilter={setGlobalFilter}
							/>
						</div>
						<div className="flex px-4 gap-10">
							{headerGroups.map((headerGroup) =>
								headerGroup.headers.map((column) =>
									column.Filter ? (
										<div className="mx-10 flex gap-10 px-3" key={column.id}>
											{column.render("Filter")}
										</div>
									) : null
								)
							)}
						</div>
						{/* </div> */}
						<label>
							<span className="sr-only">Items Per Page</span>
							<select
								className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
								value={state.pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
							>
								{[5, 10, 20].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										Show {pageSize}
									</option>
								))}
							</select>
						</label>
					</div>
				</div>
			</div>

			{/* table */}
			<div className="block w-full overflow-x-auto">
				<table
					{...getTableProps()}
					className="items-center w-full bg-transparent border-collapse"
				>
					<thead className="bg-gray-50">
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									// Add the sorting props to control sorting. For this example
									// we can add them into the header props
									<th
										scope="col"
										className={
											"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
											(color === "light"
												? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
												: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
										}
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										<div className="flex items-center justify-between">
											{column.render("Header")}
											{/* Add a sort direction indicator */}
											<span>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<SortDownIcon className="w-4 h-4 text-gray-400" />
													) : (
														<SortUpIcon className="w-4 h-4 text-gray-400" />
													)
												) : (
													<SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
												)}
											</span>
										</div>
									</th>
								))}
								<th
									className={
										"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
										(color === "light"
											? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
											: "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
									}
								>
									Action
								</th>
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()} className="bg-white ">
						{page.map((row, i) => {
							// new
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td
												{...cell.getCellProps()}
												className="px-4 align-middle border-0 text-sm whitespace-nowrap p-4"
												role="cell"
											>
												{cell.column.id === "status" ? (
													<div className="bg-rose-700 flex">
														{/* <div className="text-rose-700">?</div> */}
														{cell.render("Cell")}
														{/* {console.log(cell.column.id)} */}
													</div>
												) : (
													cell.render("Cell")
												)}
											</td>
										);
									})}
									<td className="px-6 align-middle border-0 text-xs whitespace-nowrap p-4">
										<Button>Action</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			<div className="px-5">
				{/* <div className="flex-1 flex justify-between md:hidden">
					<Button onClick={() => previousPage()} disabled={!canPreviousPage}>
						Previous
					</Button>
					<Button onClick={() => nextPage()} disabled={!canNextPage}>
						Next
					</Button>
				</div> */}
				<div className="flex items-center w-full justify-between p-3">
					<div className="flex gap-x-2 items-baseline">
						<span className="text-sm text-gray-700">
							Page <span className="font-medium">{state.pageIndex + 1}</span> of
							<span className="font-medium">{pageOptions.length}</span>
						</span>
					</div>
					<div>
						<nav
							className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
							aria-label="Pagination"
						>
							<PageButton
								className="rounded-l-md"
								onClick={() => gotoPage(0)}
								disabled={!canPreviousPage}
							>
								<span className="sr-only">First</span>
								<ChevronDoubleLeftIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</PageButton>
							<PageButton
								onClick={() => previousPage()}
								disabled={!canPreviousPage}
							>
								<span className="sr-only">Previous</span>
								<ChevronLeftIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</PageButton>
							<PageButton onClick={() => nextPage()} disabled={!canNextPage}>
								<span className="sr-only">Next</span>
								<ChevronRightIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</PageButton>
							<PageButton
								className="rounded-r-md"
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
							>
								<span className="sr-only">Last</span>
								<ChevronDoubleRightIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</PageButton>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;

Table.defaultProps = {
	color: "light",
};

Table.propTypes = {
	color: PropTypes.oneOf(["light", "dark"]),
};
