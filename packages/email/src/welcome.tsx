import { Html, Button, render } from "@react-email/components";
import { FC } from "react";

const WelcomeEmail: FC = () => {
	return (
		<Html lang="en">
			<Button
				href="https://example.com"
				style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
			>
				Click me
			</Button>
		</Html>
	);
};

const getWelcomeEmailHtml = async () => {
	return await render(<WelcomeEmail />);
};

export { WelcomeEmail, getWelcomeEmailHtml };
export default WelcomeEmail;
