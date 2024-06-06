import Footer from "../Footer";
import Header from "../Header";

function Layout({children}) {
    return (
        <>
			<div className='upperDiv'>
				<div className='headerDiv'>
					<Header />
				</div>
				<div className='flexDiv'>
					<div className='childrenDiv'>
						{children}
					</div>
				</div>
				<div className='footerDiv'>
					<Footer />
				</div>
			</div>
        </>
    );
}

export default Layout;