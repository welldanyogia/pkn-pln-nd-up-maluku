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

export function ProjectComboBox({ projects,project_id,onProjectChange }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(parseInt(project_id))
    const [inputValue, setInputValue] = React.useState("")
    const [loading, setLoading] = React.useState(false) // Loading state

    console.log("projects",projects)
    console.log("value",value)
    console.log("nama",projects.find((cat) => cat.id === parseInt(value))?.nama_pekerjaan)
    // Handler untuk memilih proyek dan menyimpan project_id
    const handleSelectProject = (selectedProject) => {
        setValue(selectedProject.id);  // Simpan nama pekerjaan
        // setID(selectedProject.id);                // Simpan project_id
        // setProject(selectedProject);              // Kirim project terpilih ke parent
        onProjectChange(selectedProject.id);
        setOpen(false);                           // Tutup popover setelah pemilihan
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit justify-between"
                >
                    {value
                        ? projects.find((cat) => cat.id === value)?.nama_pekerjaan
                        : "Pilih Proyek..."}
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
                            No project found.
                        </CommandEmpty>
                        <CommandGroup>
                            {projects
                                .filter((cat) =>
                                    cat.nama_pekerjaan.toLowerCase().includes(inputValue.toLowerCase())
                                )
                                .map((cat) => (
                                    <CommandItem
                                        key={cat.id}
                                        value={cat.nama_pekerjaan}
                                        onSelect={() => handleSelectProject(cat)}  // Panggil handler saat proyek dipilih
                                    >
                                        {cat.nama_pekerjaan}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === cat.nama_pekerjaan ? "opacity-100" : "opacity-0"
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
