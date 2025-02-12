import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";

type FileUploaderProps = {
	onFieldChange: (url: string) => void;
	setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({ onFieldChange, setFiles }: FileUploaderProps) {
	const [preview, setPreview] = useState<string | null>(null);
	const maxFileSize = 500 * 1024;

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (file.size > maxFileSize) {
			alert("File size should be less than 500KB");
			return;
		}

		setFiles((prev) => [...prev, file]);

		const fileURL = URL.createObjectURL(file);
		setPreview(fileURL);
		onFieldChange(fileURL);
	};

	return (
		<div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
			<input
				type="file"
				accept="image/png, image/jpeg, image/svg+xml"
				className="hidden"
				id="fileInput"
				onChange={handleFileChange}
			/>
			<label
				htmlFor="fileInput"
				className={`flex-center flex-col py-5 text-grey-500 cursor-pointer ${
					!preview && "h-full w-full"
				}`}
			>
				{preview ? (
					<img
						src={preview}
						alt="Preview"
						className="h-full object-cover"
					/>
				) : (
					<>
						<img
							src="/file-upload.svg"
							width={77}
							height={77}
							alt="file upload"
						/>
						<h3 className="mb-2 mt-2">Drag photo here</h3>
						<p className="p-medium-12 mb-4">
							SVG, PNG, JPG (Max: 500KB)
						</p>
						<Button type="button" className="rounded-full">
							Select from computer
						</Button>
					</>
				)}
			</label>
		</div>
	);
}
