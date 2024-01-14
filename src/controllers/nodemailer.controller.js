import nodemailer from 'nodemailer';

export const sendMail = async (data) => {
	const transporter = nodemailer.createTransport({
		// config mail server
		service: 'Gmail',
		auth: {
			user: 'shopthoitrangnamTND@gmail.com',
			pass: 'iasmrtjftlfikctp',
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
export const sendMail1 = async (data) => {
	const transporter = nodemailer.createTransport({
		// config mail server
		service: 'Gmail',
		auth: {
			user: 'shopthoitrangnamTND@gmail.com',
			pass: 'iasmrtjftlfikctp',
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	const mainOptions = {
		from: data.fullname,
		to: data.email,
		subject: 'Cảm ơn bạn đã liên hệ',
		text: 'Hi!',
		html: `
		  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
			<h2 style="color: #333; text-align: center;">Bạn có một tin nhắn mới</h2>
			<ul style="list-style-type: none; padding: 0;">
			  <li>
				<strong>Tên:</strong> ${data.name}
			  </li>
			  <li>
				<strong>Email:</strong> ${data.email}
			  </li>
			  <li>
				<strong>Số điện thoại:</strong> ${data.phonenumber}
			  </li>
			  <li>
				<strong>Nội dung:</strong> ${data.description}
			  </li>
			  <li>
				<strong>Trạng thái:</strong> ${data.status}
			  </li>
			  <li>
				<strong style="color: red; font-size: 18px;">Trả lời:</strong> ${data.traloi}
			  </li>
			</ul>
		  </div>
		`,
	  };
	  

	await transporter.sendMail(mainOptions);
};
