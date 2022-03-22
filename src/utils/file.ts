export const toBase64 = async (file: any) =>
	// if (!file) return;
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	}).catch((err) => {
		throw new Error(err);
	});
