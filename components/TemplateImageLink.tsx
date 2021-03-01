export default function TemplateImageLink({
	url,
	name,
	className,
}: {
	url: string;
	name: string;
	className?: string;
}) {
	return (
		<a href={url} rel='noopener noreferrer'>
			<img
				className={className}
				src={`https://raw.githubusercontent.com/hustlelikeaboss/static-files/master/img/sqsp-demo-screenshots/${name}.png`}
				alt={`screenshot for Squrespace template ${name}`}
			/>
		</a>
	);
}
