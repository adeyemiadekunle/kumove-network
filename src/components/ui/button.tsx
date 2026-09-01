import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold cursor-pointer transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground border border-transparent shadow-md hover:bg-secondary hover:text-secondary-foreground hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 active:translate-y-0 [&:hover_svg]:translate-x-1',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
        outline:
          'border border-border/80 bg-transparent text-foreground hover:bg-card hover:border-secondary hover:text-secondary hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 [&:hover_svg]:translate-x-1',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-md hover:shadow-secondary/25 active:translate-y-0 [&:hover_svg]:translate-x-1',
        ghost:
          'border border-transparent hover:bg-muted hover:text-foreground active:bg-muted/80',
        link:
          'text-primary underline-offset-4 hover:underline hover:text-secondary',
      },
      size: {
        default: 'min-h-10 px-5 py-2.5',
        sm: 'min-h-8 rounded-full px-3.5 text-xs',
        lg: 'min-h-12 rounded-full px-7 py-3 text-sm font-bold',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
