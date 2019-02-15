export const pivotFib = (values) => {
  const initial = { r3: 0, r2: 0, r1: 0, p: 0, s1: 0, s2: 0, s3: 0 };
  
	const piv = values.map(item => {
		const pivotLevel = (item[2] + item[3] + item[4]) / 3;

		const fib = {
			r3: Number(pivotLevel + 1.0 * (item[2] - item[3])).toFixed(8),
			r2: Number(pivotLevel + 0.618 * (item[2] - item[3])).toFixed(8),
			r1: Number(pivotLevel + 0.382 * (item[2] - item[3])).toFixed(8),
			p: Number(pivotLevel).toFixed(8),
			s1: Number(pivotLevel - 0.382 * (item[2] - item[3])).toFixed(8),
			s2: Number(pivotLevel - 0.618 * (item[2] - item[3])).toFixed(8),
			s3: Number(pivotLevel - 1 * (item[2] - item[3])).toFixed(8)
		};

		return {
			close: Number(item[4]).toFixed(8),
			...fib
		};
  });
  
	return piv.length >= 2 ? piv[piv.length - 2] : initial;
};
