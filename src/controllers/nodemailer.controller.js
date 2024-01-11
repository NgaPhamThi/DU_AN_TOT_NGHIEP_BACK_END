import nodemailer from 'nodemailer';

export const sendMail = async (data) => {
	const transporter = nodemailer.createTransport({
		// config mail server
		service: 'Gmail',
		auth: {
			user: 'quangpn1254@gmail.com',
			pass: 'kvqhpmnuubestlbv',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	const mainOptions = {
		// thiết lập đối tượng, nội dung gửi mail
		from: data.fullname,
		to: data.email,
		subject: 'cảm ơn bạn đã đặt hàng tại Cửa hàng chúng tôi',
		text: 'Hi!',
		html:
			'<p>You have got a new message</b><ul><li>Username:' +
			data.fullname +
			'</li><li>Email:' +
			data.email +
			'</li><li>status:' +
			data.status +
			'</li><li>address:' +
			data.address +
			'</li><li>total:' +
			data.orderTotal +
			'</li><li>phone:' +
			data.phonenumber +
			'</li></ul>',
	};

	await transporter.sendMail(mainOptions);
};
