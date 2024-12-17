import { FC } from "react";
import { Button, Html, render } from "@react-email/components";

const WelcomeEmail: FC = () => {
	return (
		<Html>
			<Button
				href="https://example.com"
				style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
			>
				Click me
			</Button>
		</Html>
	);
};

const welcomeEmailHtml = await render(<WelcomeEmail />);

export { WelcomeEmail, welcomeEmailHtml };
export default WelcomeEmail;
