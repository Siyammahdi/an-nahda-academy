"use client"

import { SearchIcon } from '@/components/icons';
import { subtitle, title } from '@/components/primitives';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Input } from '@nextui-org/input';
import React from 'react';
import { FaAngleDown } from "react-icons/fa6";

const Banner = () => {
    return (
        <div className='h-[70vh] flex flex-col justify-center'>
            <div className="inline-block max-w-xl text-left justify-center">
                <div>
                    <span className={title({size:'lg'})}>In the way of&nbsp;</span>
                    <span className={title({size:'lg', color: "violet" })}>Qur&apos;an&nbsp;</span>
                    <br />
                    <span className={title({size:'lg'})}>
                        and
                    </span>
                    <span className={title({size:'lg', color: "violet" })}>&nbsp;Hadith&nbsp;</span>
                    <div className={subtitle({ class: "mt-4" })}>
                        Beautiful, fast and modern educational website.
                    </div>
                </div>
                <div className='space-y-4 mt-4'>
                    <Input
                        classNames={{
                            base: "w-2/3 h-10",
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                        }}
                        placeholder="Type to search..."
                        size="md"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                    />


                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                            >
                                See courses <FaAngleDown />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new">New file</DropdownItem>
                            <DropdownItem key="copy">Copy link</DropdownItem>
                            <DropdownItem key="edit">Edit file</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

        </div>
    );
};

export default Banner;