import Signin from "@/components/shared/Signin";

const SigninPage = () => {
	return (
		<main>
			<section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
				<h3 className="wrapper h3-bold text-center sm:text-left">
					Access Your Account
				</h3>
			</section>

			<div className="wrapper my-8">
				<Signin />
			</div>
		</main>
	);
};

export default SigninPage;
