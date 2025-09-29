export const REACT_APP_API_URL = `${process.env.REACT_APP_API_URL}`;

const thisYear = new Date().getFullYear();

export const carYears: any = [];

for (let i = 2000; i <= thisYear; i++) {
	carYears.push(String(i));
}

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Please, Login first!',
	error3: 'Please, Fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
};

export const topCarRank = 19;
