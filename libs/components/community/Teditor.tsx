import React, { useRef, useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Stack,
	Typography,
	Select,
	TextField,
	SelectChangeEvent,
} from '@mui/material';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { Editor } from '@toast-ui/react-editor';
import { getJwtToken } from '../../auth';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../../sweetAlert';
import '@toast-ui/editor/dist/toastui-editor.css';

const articleCategoryLabels: Record<BoardArticleCategory, string> = {
	[BoardArticleCategory.NEWS]: 'NEWS',
	[BoardArticleCategory.REVIEWS]: 'REVIEWS',
	[BoardArticleCategory.EVENT]: 'EVENT',
	[BoardArticleCategory.GUIDE]: 'GUIDE',
	[BoardArticleCategory.PROMOTION]: 'PROMOTION',
	[BoardArticleCategory.ANNOUNCEMENT]: 'ANNOUNCEMENT',
};

const TuiEditor = () => {
	const editorRef = useRef<Editor>(null);
	const token = getJwtToken();
	const router = useRouter();

	const [articleCategory, setArticleCategory] = useState<BoardArticleCategory>(BoardArticleCategory.NEWS);
	const [articleTitle, setArticleTitle] = useState('');
	const [articleImage, setArticleImage] = useState('');

	/** Apollo mutation **/
	const [createBoardArticle] = useMutation(CREATE_BOARD_ARTICLE);

	/** Upload image handler **/
	const uploadImage = async (image: Blob): Promise<string | undefined> => {
		try {
			const formData = new FormData();
			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImageUploader($file: Upload!, $target: String!) {
            imageUploader(file: $file, target: $target)
          }`,
					variables: {
						file: null,
						target: 'article',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.file'],
				}),
			);
			formData.append('0', image);

			const response = await axios.post(process.env.REACT_APP_API_GRAPHQL_URL || '', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': 'true',
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImage = response.data.data.imageUploader;
			setArticleImage(responseImage);

			return `${REACT_APP_API_URL}/${responseImage}`;
		} catch (err) {
			console.error('ERROR, uploadImage:', err);
			return undefined;
		}
	};

	/** Handlers **/
	const changeCategoryHandler = (e: SelectChangeEvent<BoardArticleCategory>) => {
		setArticleCategory(e.target.value as BoardArticleCategory);
	};

	const articleTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setArticleTitle(e.target.value);
	};

	const handleRegisterButton = async () => {
		try {
			const editor = editorRef.current;
			const articleContent = editor?.getInstance().getHTML() || '';

			if (!articleTitle.trim() || !articleContent.trim()) {
				throw new Error(Message.INSERT_ALL_INPUTS);
			}

			await createBoardArticle({
				variables: {
					input: {
						articleTitle: articleTitle.trim(),
						articleContent,
						articleImage,
						articleCategory,
					},
				},
			});

			await sweetTopSuccessAlert('Article is created successfully!', 700);
			await router.push({
				pathname: '/mypage',
				query: { category: 'myArticles' },
			});
		} catch (err: any) {
			console.error(err);
			await sweetErrorHandling(new Error(Message.INSERT_ALL_INPUTS));
		}
	};

	/** Disable button if title or content empty **/
	const isDisabled = !articleTitle.trim() || !editorRef.current?.getInstance().getHTML().trim();

	return (
		<Stack>
			<Stack direction="row" justifyContent="space-evenly" sx={{ margin: '40px' }}>
				<Box sx={{ width: '300px' }} className="form_row">
					<Typography sx={{ color: '#7f838d', margin: '10px' }} variant="h3">
						Category
					</Typography>
					<FormControl sx={{ width: '100%', background: 'white' }}>
						<Select
							value={articleCategory}
							onChange={changeCategoryHandler}
							displayEmpty
							inputProps={{ 'aria-label': 'Select category' }}
						>
							{Object.values(BoardArticleCategory).map((category) => (
								<MenuItem key={category} value={category}>
									{articleCategoryLabels[category]}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				<Box sx={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
					<Typography sx={{ color: '#7f838d', margin: '10px' }} variant="h3">
						Title
					</Typography>
					<TextField
						onChange={articleTitleHandler}
						label="Type Title"
						variant="outlined"
						sx={{ width: '300px', background: 'white' }}
						value={articleTitle}
					/>
				</Box>
			</Stack>

			<Editor
				initialValue={'Type here'}
				placeholder={'Type here'}
				previewStyle={'vertical'}
				height={'640px'}
				// @ts-ignore
				initialEditType={'WYSIWYG'}
				toolbarItems={[
					['heading', 'bold', 'italic', 'strike'],
					['image', 'table', 'link'],
					['ul', 'ol', 'task'],
				]}
				ref={editorRef}
				hooks={{
					addImageBlobHook: async (image: any, callback: any) => {
						console.log('image: ', image);
						const uploadedImageURL = await uploadImage(image);
						callback(uploadedImageURL);
						return false;
					},
				}}
				events={{
					load: function (param: any) {},
				}}
			/>

			<Stack direction="row" justifyContent="center" mt={3}>
				<Button
					variant="contained"
					sx={{
						margin: '30px',
						width: '250px',
						height: '45px',
						backgroundColor: '#FF7101',
						color: '#FFF',
						'&:hover': {
							backgroundColor: '#e06500', // slightly darker on hover
						},
					}}
					onClick={handleRegisterButton}
					disabled={isDisabled}
				>
					Register
				</Button>
			</Stack>
		</Stack>
	);
};

export default TuiEditor;
