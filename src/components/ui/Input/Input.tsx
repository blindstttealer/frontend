import styles from './Input.module.scss'
import { FC, useState } from 'react'
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { EyeIconSVG } from '../ui-kit'

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
	console.log('опции', rest)
	const optionsForm = options
		? { ...register(name, options) }
		: { ...register(name) }

	const isPassword = type === 'password'

	const [typeInput, setTypeInput] = useState(type)
	const handleMouseDown = () => {
		setTypeInput('text')
	}

	const handleMouseUp = () => {
		setTypeInput(type)
	}

	return (
		<fieldset className={className}>
			<div className={styles.input__wrapper}>
				<input
					placeholder={placeholder}
					type={isPassword ? typeInput : type}
					{...optionsForm}
					{...rest}
					className={styles.input}
				/>
				{error || isPassword ? (
					<div className={styles.input__icons}>
						{isPassword ? (
							<button
								className={styles.input__eye}
								type="button"
								onMouseDown={handleMouseDown}
								onMouseUp={handleMouseUp}
							>
								<EyeIconSVG />
							</button>
						) : null}
					</div>
				) : null}
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</fieldset>
	)
}

export default Input