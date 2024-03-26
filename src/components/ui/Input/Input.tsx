import styles from './Input.module.scss'
import { FC } from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import cn from 'clsx';

interface InputProps {
	placeholder?: string
	type?: string
	name: string
	className?: string
	error?: any
	touchedFields?: Partial<Readonly<{
		[x: string]: any;
	}>>
	options?: RegisterOptions<FieldValues>
	register: UseFormRegister<FieldValues>
}

const Input: FC<InputProps> = ({
	placeholder,
	error,
	type = 'text',
	name,
	className,
	touchedFields,
	register,
	options,
	...rest
}) => {
	// console.log("error", error, "touchedFields", touchedFields)
	const optionsForm = options
		? { ...register(name, options) }
		: { ...register(name) }

	return (
		<>
			<div className={className}>
				<input
					placeholder={placeholder}
					type={type}
					{...optionsForm}
					{...rest}
					className={cn(styles.input, {
						[styles.borderError]: error !== undefined
					})}
				/>
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</>
	)
}

export default Input
