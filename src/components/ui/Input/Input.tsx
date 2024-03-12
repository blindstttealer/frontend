import styles from './Input.module.scss'
import { FC } from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
	placeholder?: string
	type?: string
	name: string
	className?: string
	error?: any
	options?: RegisterOptions<FieldValues>
	register: UseFormRegister<FieldValues>
}

const Input: FC<InputProps> = ({
	placeholder,
	error,
	type = 'text',
	name,
	className,
	register,
	options,
	...rest
}) => {
	console.log("опции", rest)
	const optionsForm = options
		? { ...register(name, options) }
		: { ...register(name) }

	return (
		<div className={className}>
			<input
				placeholder={placeholder}
				type={type}
				{...optionsForm}
				{...rest}
				className={styles.input}
			/>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	)
}

export default Input
