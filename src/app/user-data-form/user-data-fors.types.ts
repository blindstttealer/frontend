export interface IDataForm {
	username: string
	dataFromInput: {
		display_name: string
		first_name: string
		last_name: string
		phone: string
		country: string
		city: string
		bio: string
		avatar: string
	}
	avatar: null | React.ChangeEvent<HTMLInputElement>
}
