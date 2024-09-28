"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios';

export function CategoryComboBox({ category, setCategory, setID,valueCat }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(valueCat)
    const [inputValue, setInputValue] = React.useState("")
    const [loading, setLoading] = React.useState(false) // Loading state

    // console.log(value)

    const handleCreateCategory = async () => {
        if (inputValue.trim()) {
            const newCategory = {
                label: inputValue,
            };

            setLoading(true); // Start loading

            try {
                const response = await axios.post('/admin/monitoring/proyek/category', newCategory);

                if (response.status === 201) {
                    const createdCategory = response.data;

                    // Update category state to include the new category
                    setCategory(prevCategories => [...prevCategories, createdCategory]);

                    // Set the selected value
                    // setValue(createdCategory.value);
                    setCategory(createdCategory)
                    // setID(createdCategory.id)
                    setInputValue(''); // Clear input after creation
                    setOpen(false);
                } else {
                    console.error('Error creating category:', response.statusText);
                }
            } catch (error) {
                console.error('Error creating category:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? category.find((cat) => cat.value === value)?.label
                        : "Pilih Kategori proyek..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search or create category..."
                        className="h-9"
                        value={inputValue}
                        onValueChange={setInputValue}
                    />
                    <CommandList>
                        <CommandEmpty>
                            No category found.
                            <Button
                                variant="link"
                                className="text-blue-500"
                                onClick={handleCreateCategory}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Creating "{inputValue}"
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <PlusIcon className="mr-2" />
                                        Create "{inputValue}"
                                    </span>
                                )}
                            </Button>
                        </CommandEmpty>
                        <CommandGroup>
                            {category
                                .filter((cat) =>
                                    cat.label.toLowerCase().includes(inputValue.toLowerCase())
                                )
                                .map((cat) => (
                                    <CommandItem
                                        key={cat.id}
                                        value={cat.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            // setID(cat.id)
                                            setCategory(cat)
                                            setOpen(false)
                                        }}
                                    >
                                        {cat.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === cat.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
