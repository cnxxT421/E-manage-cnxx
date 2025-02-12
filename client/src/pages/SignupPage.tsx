import Signup from "@/components/shared/Signup";

const SignupPage = () => {
	return (
		<main>
			<section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
				<h3 className="wrapper h3-bold text-center sm:text-left">
					Create an Account
				</h3>
			</section>

			<div className="wrapper my-8">
				<Signup />
			</div>
		</main>
	);
};

export default SignupPage;
