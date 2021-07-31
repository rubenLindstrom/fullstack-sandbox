import React from "react";
import {
	TextField,
	Button,
	Checkbox,
	Theme,
	Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import moment from "moment";

import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles((theme: Theme) => ({
	todoContainer: {
		marginBottom: "12px"
	},
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
	},
	dueDateIndicator: {
		margin: "6px 0 0 33px"
	}
}));

enum TimeDelta {
	PAST,
	NOW,
	FUTURE
}

type Props = {
	item: TodoItem;
	onToggleCompletion: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDueDateChange: (date: Date | null) => void;
	onDelete: () => void;
};

const ToDoItem: React.FC<Props> = ({
	item,
	onToggleCompletion,
	onTextChange,
	onDueDateChange,
	onDelete
}) => {
	const classes = useStyles();

	const getDueDateTimeDelta = (dueDate: Date): TimeDelta => {
		const today = new Date().toISOString().substring(0, 10);
		const dueDateDay = new Date(dueDate).toISOString().substring(0, 10);

		if (today === dueDateDay) return TimeDelta.NOW;
		else if (today < dueDateDay) return TimeDelta.FUTURE;
		else return TimeDelta.PAST;
	};

	const renderTimeDifference = (dueDate: Date) => {
		const timeDiff = getDueDateTimeDelta(dueDate);
		switch (timeDiff) {
			case TimeDelta.NOW:
				return "Due today";
			case TimeDelta.PAST:
			case TimeDelta.FUTURE:
				return `Due ${moment(dueDate).fromNow()}`;
		}
	};

	const timeDeltaToStyles = {
		[TimeDelta.NOW]: "#f1c40f",
		[TimeDelta.FUTURE]: "#27ae60",
		[TimeDelta.PAST]: "#c0392b"
	};

	return (
		<div className={classes.todoContainer}>
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
						value={item.dueDate ?? null}
						onChange={(date) => onDueDateChange(date)}
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
			{item.dueDate && (
				<Typography
					className={classes.dueDateIndicator}
					style={{
						color: timeDeltaToStyles[getDueDateTimeDelta(item.dueDate)]
					}}
				>
					{renderTimeDifference(item.dueDate)}
				</Typography>
			)}
		</div>
	);
};

export default ToDoItem;
