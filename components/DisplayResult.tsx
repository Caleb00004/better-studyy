import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import ErrorBox from './ErrorBox';

type Props = { 
	data: { note: string; task: string };
};

let selection: string;
const DisplayResult = ({ data }: Props) => {
	const [result, setResult] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState({
		state: false,
		message: '',
	});

	switch (data.task) {
		case 'explain':
			selection = 'Explain this in detail: ';
			break;
		case 'simplify':
			selection = 'Simplify this for a 5 year old to understand: ';
			break;
		case 'keypoints':
			selection = 'Extract the key points from this note in list form: ';
			break;
		case 'question':
			selection = 'What possible questions could come out of this in an exam: ';
		default:
			break;
	}

	useEffect(() => {
		const getResult = async () => {
			
			const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API; // Replace with your OpenAI API key

			const ddata = {
				model: 'gpt-3.5-turbo', // or another model, like 'gpt-3.5-turbo'
				// prompt: selection + data.note,
				messages: [{ role: "system", content: selection + data.note }],
				// max_tokens: 300,
				temperature: 0.5,
			};

			fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST', 
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${API_KEY}`,
				},
				body: JSON.stringify(ddata),
			}) .then(response => response.json())
				.then(data => {
					 let result = data.choices[0].message.content.trim();
    
					// Split the result by the hyphen and join with <br> tags
					result = result.split(' - ').join('<br>');

					if (result.length === 0) throw Error('No result');

					setResult(result);
					window.localStorage.setItem('result', result);
					setIsLoading(false);
					// const result = data.choices[0].message.content.replace(/:\n/g, '<br>').trim();
					// if (result.length === 0) throw Error('No result');

					// setResult(result);
					// window.localStorage.setItem('result', result);
					// setIsLoading(false);
				})
				.catch(error => {
					console.error('Error:', error);
					setIsLoading(false);
					setErrorMessage({ state: true, message: 'Oops! Something went wrong' });
					console.error(error);
				});

		};

		if (JSON.stringify(data) === window.localStorage.getItem('note')) {
			if (window.localStorage.getItem('result') === null) return;
			const result = window.localStorage.getItem('result') as string;
			setResult(result);
			return;
		} else {
			setIsLoading(true);
			getResult();
		}
	}, []);

	const copyToClipboard = async () => {
		if (result === '') return;
		if ('clipboard' in navigator) {
			return await navigator.clipboard.writeText(result);
		} else {
			return document.execCommand('copy', true, result);
		}
	};

	const onClose = () => {
		setErrorMessage({ state: false, message: '' });
	};

	return (
		<>
			<section className='mx-4 flex flex-wrap justify-center gap-2 overflow-y-auto sm:justify-start'>
				<div className='h-[400px] w-[48%] min-w-[250px] max-w-[1200px] overflow-y-auto rounded-sm border p-4 text-fsm font-normal sm:max-h-full sm:min-h-[90vh]'>
					{data.note}
				</div>
				<div className='h-[400px] w-[48%] min-w-[250px] max-w-[1200px] sm:max-h-full sm:min-h-[90vh]'>
					<div className='flex justify-between'>
						<h2>Results</h2>

						<div
							className='center cursor-pointer text-fsm'
							onClick={copyToClipboard}>
								{/* @ts-ignore */}
							<Icon icon='bxs:copy' color='#D9DDE0' width='25' height='25' />
							Copy
						</div>
					</div>

					<div
						className={`h-[94%] w-full overflow-y-auto rounded-sm bg-light p-4 text-fsm font-normal text-black ${
							isLoading && 'center'
						}`}>
						{isLoading ? (
							<svg
								aria-hidden='true'
								className='inline h-20 w-20 animate-spin fill-brand'
								viewBox='0 0 100 101'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
									fill='currentColor'
								/>
								<path
									d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
									fill='currentFill'
								/>
							</svg>
						) : (
							<>{result}</>
						)}
					</div>
				</div>
			</section>
			{errorMessage.state && (
				// @ts-ignore
				<ErrorBox message={errorMessage.message} onClose={onClose} />
			)}
		</>
	);
};

export default DisplayResult;
