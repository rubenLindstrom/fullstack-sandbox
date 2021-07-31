import React from "react";
import { TextField, Button, Checkbox, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
	return (
		<div key={item._id} className={classes.todoLine}>
			<div>
				<Checkbox
					onChange={onToggleCompletion}
					checked={item.completed}
					icon={<CheckCircleOutlineIcon />}
					checkedIcon={<CheckCircleIcon />}
					className={classes.checkbox}
					color="default"
				/>
			</div>
			<TextField
				label="What to do?"
				value={item.name}
				onChange={onTextChange}
				className={classes.textField}
			/>
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
