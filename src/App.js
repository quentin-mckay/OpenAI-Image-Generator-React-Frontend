import { useState } from 'react'
import Spinner from './Spinner'

export default function App() {

	const [formData, setFormData] = useState({
		prompt: 'Prompt...',
		size: '512x512'
	})

	// holds data received from the server
	// example: { success: True, image_url: 'http://...' }
	const [data, setData] = useState({})

	const [showSpinner, setShowSpinner] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	// update form data
	function handleChange(event) {
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value
			}
		})
	}

	
	function generateImageRequest() {
		try {

			setShowSpinner(true)
			console.log('showing spinner')
			
			fetch('https://openai-image-generator-flask-backend.onrender.com/generateimage', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			.then(res => res.json())
			.then(data => {
				// console.log(data)
				setData(data)
				setShowSpinner(false)
				console.log('hiding spinner')
			})

		} catch (error) {
			
		}
	}
	
			
	return (
		<div>
			<main className='container mx-auto mt-12 max-w-2xl bg-white/40 rounded'>
				<form className="p-6 space-y-4 rounded border-gray-800">
					
					<textarea
						name="prompt"
						placeholder='Type a prompt...'
						className='rounded w-full text-gray-500 border-gray-400 font-bold placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500'
						onChange={handleChange}
						value={formData.prompt}
						></textarea>
			
					<div className='flex space-x-6'>

						<select
							name="size"
							className='rounded border-gray-400 text-gray-500 focus:outline-none focus:ring-1 focus:ring-sky-500 '
							value={formData.size}
							onChange={handleChange}
							>
							<option value="256x256">Small (256x256)</option>
							<option value="512x512">Medium (512x512)</option>
							<option value="1024x1024">Large (1024x1024)</option>
						</select>
					
						<input
							onClick={generateImageRequest}
							type="button"
							value="Generate Image"
							className='w-full border border-gray-500 rounded p-2 px-4 font-bold text-white
							border-none bg-green-600 hover:cursor-pointer hover:bg-green-500 active:bg-green-400 transition'/>
					</div>
				</form>
			
				{data.image_url && <img src={data.image_url} alt="generated" className='w-full p-6 pt-0' />}
			</main>

			{showSpinner && <Spinner />}
			
		</div>
	)
}