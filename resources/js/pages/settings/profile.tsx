import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type Department, type Position, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
    departments,
    positions,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    departments: Department[];
    positions: Position[];
}) {
    const { auth } = usePage<SharedData>().props;
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Profile information"
                        description="Update your name and email address"
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage
                                            src={photoPreview || auth.user.avatar}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="text-xl">
                                            {auth.user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid gap-1.5">
                                        <Label htmlFor="profile_photo">Foto Profil</Label>
                                        <Input
                                            id="profile_photo"
                                            type="file"
                                            name="profile_photo"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="w-full max-w-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG atau JPEG. Maksimal 2MB.
                                        </p>
                                        <InputError message={errors.profile_photo} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="nip">Nomor Induk Pegawai (NIP)</Label>

                                    <Input
                                        id="nip"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.nip as string}
                                        name="nip"
                                        required
                                        placeholder="NIP"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.nip}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Nomor Handphone</Label>

                                    <Input
                                        id="phone"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.phone as string}
                                        name="phone"
                                        placeholder="No. HP"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.phone}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="department_id">Bagian / Bidang</Label>

                                    <select
                                        id="department_id"
                                        name="department_id"
                                        defaultValue={String(auth.user.department_id ?? '')}
                                        className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900"
                                        required
                                    >
                                        <option value="">Pilih Bagian / Bidang</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.department_id}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="position_id">Jabatan</Label>

                                    <select
                                        id="position_id"
                                        name="position_id"
                                        defaultValue={String(auth.user.position_id ?? '')}
                                        className="mt-1 block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900"
                                        required
                                    >
                                        <option value="">Pilih Jabatan</option>
                                        {positions.map((pos) => (
                                            <option key={pos.id} value={pos.id}>
                                                {pos.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.position_id}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                    <div className="mt-2 text-sm font-medium text-green-600">
                                                        A new verification link has
                                                        been sent to your email
                                                        address.
                                                    </div>
                                                )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        Save
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Saved
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
