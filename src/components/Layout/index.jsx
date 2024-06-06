import Footer from "../Footer";
import Header from "../Header";

function Layout({children}) {
    return (
        <>
			<div class='upperDiv'>
				<div class='headerDiv'>
					<Header />
				</div>
				<div class='flexDiv'>
					<div class='childrenDiv'>
						{children}
					</div>
				</div>
				<div class='footerDiv'>
					<Footer />
				</div>
			</div>
        </>
    );
}

export default Layout;