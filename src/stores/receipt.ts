const allowedReceiptImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

function validateReceiptImageType(fileType: string): boolean {
	return allowedReceiptImageTypes.some((item) => item === fileType);
}

export const receiptStore = {
	allowedReceiptImageTypes,
	validateReceiptImageType
};
