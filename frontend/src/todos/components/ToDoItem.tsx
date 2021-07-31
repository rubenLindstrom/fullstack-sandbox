import React from "react";
import { TextField, Button, Checkbox, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) => ({
	todoLine: {
		display: "flex",
		alignItems: "flex-end"
	},
	checkbox: {
		width: 16,
		height: 16,
		color: theme.palette.primary.main,
		"&:checked": {
			color: theme.palette.primary.main
		}
	},
	textField: {
		flexGrow: 1
	},
	standardSpace: {
		margin: "8px"
	},
	datePicker: {
		marginBottom: 0,
		marginLeft: "16px",
		width: "140px"
	}
}));

type Props = {
	item: TodoItem;
	onToggleCompletion: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDelete: () => void;
};

const ToDoItem: React.FC<Props> = ({
	item,
	onToggleCompletion,
	onTextChange,
	onDelete
}) => {
	const classes = useStyles();
	const [date, setDate] = React.useState<Date | null>(new Date());
	return (
		<div key={item._id} className={classes.todoLine}>
			<Checkbox
				onChange={onToggleCompletion}
				checked={item.completed}
				icon={<CheckCircleOutlineIcon />}
				checkedIcon={<CheckCircleIcon />}
				className={classes.checkbox}
				color="default"
			/>
			<TextField
				label="What to do?"
				value={item.name}
				onChange={onTextChange}
				className={classes.textField}
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<KeyboardDatePicker
					margin="normal"
					id="date-picker-dialog"
					label="Due Date"
					format="dd/MM/yyyy"
					value={date}
					onChange={(value) => setDate(value)}
					KeyboardButtonProps={{
						"aria-label": "change date"
					}}
					className={classes.datePicker}
				/>
			</MuiPickersUtilsProvider>
			<Button
				size="small"
				color="secondary"
				className={classes.standardSpace}
				onClick={() => onDelete()}
			>
				<DeleteIcon />
			</Button>
		</div>
	);
};

export default ToDoItem;
