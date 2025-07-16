import React, { useMemo, useRef, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField } from '@mui/material';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { articleCategoryLabels } from '../../enums/board-article.enum';
import { Editor } from '@toast-ui/react-editor';
import { getJwtToken } from '../../auth';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import axios from 'axios';
import { T } from '../../types/common';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../../sweetAlert';
import '@toast-ui/editor/dist/toastui-editor.css';

const TuiEditor = () => {
	const editorRef = useRef<Editor>(null),
		token = getJwtToken(),
		router = useRouter();
	const [articleCategory, setArticleCategory] = useState<BoardArticleCategory>(BoardArticleCategory.NEWS);

	/** APOLLO REQUESTS **/
	const [createBoardArticle] = useMutation(CREATE_BOARD_ARTICLE);

	const memoizedValues = useMemo(() => {
		const articleTitle = '',
			articleContent = '',
			articleImage = '';

		return { articleTitle, articleContent, articleImage };
	}, []);

	/** HANDLERS **/
	const uploadImage = async (image: any) => {
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

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImage = response.data.data.imageUploader;
			console.log('=responseImage: ', responseImage);
			memoizedValues.articleImage = responseImage;

			return `${REACT_APP_API_URL}/${responseImage}`;
		} catch (err) {
			console.log('ERROR, uploadImage:', err);
		}
	};

	const changeCategoryHandler = (e: any) => {
		setArticleCategory(e.target.value);
	};

	const articleTitleHandler = (e: T) => {
		console.log(e.target.value);
		memoizedValues.articleTitle = e.target.value;
	};

	const createBlogHandler = async () => {
		try {
			const editor = editorRef.current;
			const articleContent = editor?.getInstance().getHTML() as string;
			memoizedValues.articleContent = articleContent;

			if (memoizedValues.articleContent === '' && memoizedValues.articleTitle === '') {
				throw new Error(Message.INSERT_ALL_INPUTS);
			}

			await createBoardArticle({
				variables: { input: { ...memoizedValues, articleCategory } },
			});

			await sweetTopSuccessAlert('Article is created successfully!', 700);
			await router.push({
				pathname: '/mypage',
				query: { category: 'myArticles' },
			});
		} catch (err: any) {
			console.log(err);
			sweetErrorHandling(new Error(Message.INSERT_ALL_INPUTS)).then();
		}
	};

	const doDisabledCheck = () => {
		if (memoizedValues.articleContent === '' || memoizedValues.articleTitle === '') {
			return true;
		}
	};

	return (
		<Stack className="tui-editor-container">
			<Stack direction="row" className="tui-editor-form-row" justifyContent="space-evenly">
				<Box component={'div'} className="form_row category-select">
					<Typography className="label" variant="h3">
						Category
					</Typography>
					<FormControl className="select-control">
						<Select
							value={articleCategory}
							onChange={changeCategoryHandler}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
						>
							{Object.values(BoardArticleCategory).map((category) => (
								<MenuItem key={category} value={category}>
									{articleCategoryLabels[category]}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box component={'div'} className="form_row title-input">
					<Typography className="label" variant="h3">
						Title
					</Typography>
					<TextField onChange={articleTitleHandler} id="filled-basic" label="Blog Title" className="title-textfield" />
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

			<Stack className={'save-button'}>
				<button type="button" className={'save-listing-btn'} onClick={createBlogHandler} disabled={doDisabledCheck()}>
					Save Blog
				</button>
			</Stack>
		</Stack>
	);
};

export default TuiEditor;
