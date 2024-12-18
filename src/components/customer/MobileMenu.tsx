import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {MobileMenuProps} from "@/types/types";

const MobileMenu: React.FC<MobileMenuProps> = ({ categories, services, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/95 z-50 mt-16">
            <div className="h-full overflow-y-auto pb-20">
                <div className="px-4 py-6">
                    {/* Categories Section */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 text-gray-200 hover:bg-gray-800"
                                    onClick={onClose}
                                >
                                    <span>{category.name}</span>
                                    <ChevronRight size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
                        <div className="space-y-2">
                            {services.map((service) => (
                                <Link
                                    key={service.name}
                                    href={service.href}
                                    className="block p-3 rounded-lg bg-gray-800/50 text-gray-200 hover:bg-gray-800"
                                    onClick={onClose}
                                >
                                    <div className="font-medium">{service.name}</div>
                                    <div className="text-sm text-gray-400">{service.description}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default MobileMenu