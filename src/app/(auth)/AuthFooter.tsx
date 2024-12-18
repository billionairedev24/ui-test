import Link from 'next/link'

const AuthFooter = () => {
    const currentYear = new Date().getFullYear()

    return (

        <footer className="mt-8 text-center text-sm text-gray-500">
            <div className="space-x-4 mb-2">
                <Link href="/privacy-policy" className="hover:text-black hover:underline">
                    Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="hover:text-black hover:underline">
                    Terms & Conditions
                </Link>
            </div>
            <div>
                &copy; {currentYear} AfroTransact. All rights reserved.
            </div>
        </footer>
    )
}

export default AuthFooter