import React, {useState, useEffect, useRef} from 'react';
import {
    ShoppingCart, Heart, ChevronDown, User, Menu, X, Search,
    Gift, Briefcase, BriefcaseBusinessIcon, Bell
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {cartService} from '@/app/services/cart.service';
import {wishlistService} from '@/app/services/wishlist.service';
import {SearchBar} from './SearchBar';
import {AccountDropdown} from './AccountDropDown';
import {Button} from "@/components/ui/button";
import LocationPicker from "@/components/util/LocationPicker";
import MobileMenu from "@/components/customer/MobileMenu";
import {useAuth} from "@/app/hooks/useAuth";

const categories = [
    {name: 'Electronics', href: '/category/electronics', count: '50K+ products'},
    {name: 'Fashion', href: '/category/fashion', count: '100K+ products'},
    {name: 'Home & Garden', href: '/category/home-garden', count: '30K+ products'},
    {name: 'Sports', href: '/category/sports', count: '25K+ products'},
    {name: 'Books', href: '/category/books', count: '40K+ products'},
    {name: 'Toys', href: '/category/toys', count: '20K+ products'},
    {name: 'Health & Beauty', href: '/category/health-beauty', count: '35K+ products'},
    {name: 'Automotive', href: '/category/automotive', count: '15K+ products'}
];

const services = [
    {name: 'Haircut', href: '/vendors/haircut', description: 'Professional haircut services'},
    {name: 'Massage', href: '/vendors/massage', description: 'Relaxing massage therapy'},
    {name: 'Nails', href: '/vendors/nails', description: 'Nail care and design'},
    {name: 'Logistics', href: '/vendors/logistics', description: 'Fast shipping solutions'},
    {name: 'Payments', href: '/vendors/payments', description: 'Secure payment processing'}
];


const Navbar = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [showServicesDropdown, setShowServicesDropdown] = useState(false);
    const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [location, setLocation] = useState({city: '', state: '', zip: ''});

    const searchRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const { customer } = useAuth()

    useEffect(() => {
        const cartSubscription = cartService.cartCount.subscribe(setCartCount);
        const wishlistSubscription = wishlistService.wishlistCount.subscribe(setWishlistCount);
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchDropdown(false);
            }
            if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
                setShowServicesDropdown(false);
            }
            if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
                setShowCategoriesDropdown(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setShowUserDropdown(false);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowSearchDropdown(false);
                setShowServicesDropdown(false);
                setShowCategoriesDropdown(false);
                setShowUserDropdown(false);
                setShowMobileMenu(false);
                setShowMobileSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            cartSubscription.unsubscribe();
            wishlistSubscription.unsubscribe();
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handleLocationChange = (newLocation: { city: string; state: string; zip: string }) => {
        setLocation(newLocation);
        localStorage.setItem('userLocation', JSON.stringify(newLocation));
    };

    /* const handleLogout = () => {
         authService.logout();
         setShowUserDropdown(false);
     };*/

    return (
        <>
            <nav
                className="bg-gradient-to-r from-black via-gray-900 to-black text-white fixed top-0 z-50 w-full shadow-lg">
                {/* Upper Navbar */}
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                        {/* Mobile Menu Button */}
                        <Button
                            className="lg:hidden p-2 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            {showMobileMenu ? <X size={24}/> : <Menu size={24}/>}
                        </Button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div
                                className="relative w-8 h-8 transform group-hover:scale-110 transition-transform duration-200 hidden md:block">
                                <Image
                                    className="rounded-full border-2 border-yellow-400 p-0.5"
                                    src="/images/logo.png"
                                    alt="AfroTransact"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <span
                                className="font-bold text-xl hidden md:inline bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                                AfroTransact
                            </span>
                        </Link>

                        {/* Location Picker */}
                        <div className="hidden lg:block">
                            <LocationPicker onLocationChange={handleLocationChange}/>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-3xl">
                            <SearchBar
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </div>

                        {/* Mobile Search Button */}
                        {/*<Button
                            className="hidden md:block p-2 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-lg"
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                        >
                            <Search size={24} />
                        </Button>*/}

                        {/* Right Side Icons */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {/* Notifications */}
                            {/*<Button className="relative p-2 text-white hover:text-yellow-400 transition-colors">
                                <Bell size={24} />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center animate-pulse">
                                    3
                                </span>
                            </Button>*/}

                            {/* Wishlist */}
                            <Link
                                href="/wishlist"
                                className="hidden sm:block relative p-2 text-white hover:text-yellow-400 transition-colors group"
                            >
                                <Heart size={24} className="transform group-hover:scale-110 transition-transform"/>
                                {wishlistCount > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 bg-yellow-400 text-black w-5 h-5 rounded-full text-xs flex items-center justify-center animate-pulse">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="relative p-2 text-white hover:text-yellow-400 transition-colors group"
                            >
                                <ShoppingCart size={24}
                                              className="transform group-hover:scale-110 transition-transform"/>
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 bg-yellow-400 text-black w-5 h-5 rounded-full text-xs flex items-center justify-center animate-pulse">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Account */}
                            <div className="relative" ref={userDropdownRef}>
                                <Button
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    className="p-2 text-white hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-full h-8 w-8"
                                >
                                    {customer?.picture ? (
                                        <Image
                                            src={customer.picture}
                                            alt={customer.name as string}
                                            className="h-8 w-8 rounded-full border-2 border-yellow-400 transform hover:scale-110 transition-transform"
                                            height={32}
                                            width={32}
                                        />
                                    ) : (
                                        <User className="h-6 w-6"/>
                                    )}
                                </Button>

                                <AccountDropdown
                                    wishlistCount={wishlistCount}
                                    show={showUserDropdown}
                                    onCloseAction={() => setShowUserDropdown(false)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    {showMobileSearch && (
                        <div className="md:hidden mt-2">
                            <SearchBar
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </div>
                    )}
                </div>

                {/* Lower Navbar */}
                <div className="hidden md:block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-2">
                            {/* Left Side - Categories */}
                            <div className="flex items-center space-x-6">
                                <div ref={categoriesRef} className="relative">
                                    <Button
                                        onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                                        className="text-black hover:bg-black/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                                    >
                                        Product Categories
                                        <ChevronDown size={16}
                                                     className={`transform transition-transform duration-200 ${showCategoriesDropdown ? 'rotate-180' : ''}`}/>
                                    </Button>

                                    {showCategoriesDropdown && (
                                        <>
                                            <div
                                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                                                onClick={() => setShowCategoriesDropdown(false)}
                                            />
                                            <div
                                                className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                                                {categories.map((category) => (
                                                    <Link
                                                        key={category.name}
                                                        href={category.href}
                                                        className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                                                        onClick={() => setShowCategoriesDropdown(false)}
                                                    >
                                                        <span className="text-gray-900">{category.name}</span>
                                                        <span className="text-sm text-gray-500">{category.count}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {categories.slice(0, 4).map((category) => (
                                    <Link
                                        key={category.name}
                                        href={category.href}
                                        className="text-black hover:bg-black/10 px-3 py-1 rounded-full transition-colors whitespace-nowrap"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Right Side - Services, Gift Cards, Sell */}
                            <div className="flex items-center space-x-6">
                                {/* Services Dropdown */}
                                <div ref={servicesRef} className="relative">
                                    <Button
                                        onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                                        className="text-black hover:bg-black/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                                    >
                                        <Briefcase className="h-4 w-4"/>
                                        <span className="whitespace-nowrap">Services</span>
                                        <ChevronDown size={16}
                                                     className={`transform transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`}/>
                                    </Button>

                                    {showServicesDropdown && (
                                        <>
                                            <div
                                                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                                                onClick={() => setShowServicesDropdown(false)}
                                            />
                                            <div
                                                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                                                {services.map((service) => (
                                                    <Link
                                                        key={service.name}
                                                        href={service.href}
                                                        className="block px-4 py-2 hover:bg-gray-50"
                                                        onClick={() => setShowServicesDropdown(false)}
                                                    >
                                                        <div className="font-medium text-gray-900">{service.name}</div>
                                                        <div
                                                            className="text-sm text-gray-500">{service.description}</div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Gift Cards */}
                                <Link
                                    href="/gift-cards"
                                    className="text-black hover:bg-black/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                                >
                                    <Gift className="h-4 w-4"/>
                                    <span className="whitespace-nowrap">Gift Cards</span>
                                </Link>

                                {/* Sell on AfroTransact */}
                                <Link
                                    href="/seller"
                                    className="text-black hover:bg-black/10 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                                >
                                    <BriefcaseBusinessIcon className="h-4 w-4"/>
                                    <span className="whitespace-nowrap">Sell on AfroTransact</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <MobileMenu
                    categories={categories}
                    services={services}
                    onClose={() => setShowMobileMenu(false)}
                />
            )}

            {/* Spacer for fixed navbar */}
            <div className="h-32 md:h-40"/>
        </>
    );
};

export default Navbar;