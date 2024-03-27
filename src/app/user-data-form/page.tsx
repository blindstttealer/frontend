"use client";
/* баги */
// смотри что можно сделать с типизацией в этом файле
import Image from "next/image"
import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import { Controller, useForm } from "react-hook-form"
import styles from './user-data-form.module.scss'
import { useRouter } from 'next/navigation'
import Layout from "@/components/layout/layout"
import { useEffect, useRef, useState } from "react"
import Select from 'react-select'
import { resultCountry } from "@/helpers/setCountries"
import { customStyles } from "@/helpers/customStylesFromReactSelect"
import { Loader } from "@/components/ui/Loader/Loader"
import { PatternFormat } from 'react-number-format';



export default function Registration() {

    const router = useRouter()

    /* блок для теста монтирования */
    const [mount, setMount] = useState<boolean>(false)
    /* конец */



    /* блок для прелоадера картинки */
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }, [file]);
    const ref = useRef<HTMLInputElement>(null);
    const handlePick = (e: any) => {
        e.preventDefault()
        if (ref.current) {
            ref.current.click();
        }
    };
    /* */

    /*блок для проверки монтирования компонента */

    useEffect(() => {
        setMount(true)
    }, [])

    /* end */

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        mode: "onBlur"
    });
    const onSubmit = (dataFromInput: any) => {
        console.log("данные с формы", dataFromInput, "картинка", file)
    };

    return (
        <Layout sidebar={false} rightbar={false} isSearch={false}>
            <div></div>
            {/* в данном случае моунт использую, для фикса ошибки конфликта сервера и клиента с айдишниками*/}
            {mount === true ?
                <div className={styles.container}>
                    <div className={styles.innerForm}>
                        <p className={styles.innerForm_paragraph}>Расскажите о себе</p>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label> Никнейм
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="display_name"
                                        type="text"
                                        placeholder="Никнейм"
                                        error={errors?.display_name?.message}
                                    />
                                </div>
                            </label>
                            <label>Имя
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="first_name"
                                        type="text"
                                        placeholder="Иван"
                                        error={errors?.first_name?.message}
                                    />
                                </div>
                            </label>
                            <label>Фамилия
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="last_name"
                                        type="text"
                                        placeholder="Иванов"
                                        error={errors?.last_name?.message}
                                    />
                                </div>
                            </label>
                            <label>Телефон
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field }) => (
                                            <PatternFormat className={styles.input} {...field} format="+# (###) ###-####" value="" valueIsNumericString={true} />
                                        )}
                                    />
                                </div>
                            </label>
                            <label>Страна
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Controller
                                        control={control}
                                        name="country"
                                        render={({ field }) => (
                                            <Select {...field}
                                                options={resultCountry}
                                                placeholder="Россия"
                                                styles={customStyles}
                                                inputId={Date.now().toString()}
                                            />
                                        )}
                                    />
                                </div>
                            </label>
                            <label>Город
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="town"
                                        type="text"
                                        placeholder="Москва"
                                        error={errors?.town?.message}
                                    />
                                </div>
                            </label>
                            <label>О себе
                                <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                                    <Input
                                        register={register}
                                        name="bio"
                                        type="text"
                                        error={errors?.bio?.message}
                                    />
                                </div>
                            </label>

                            {/* блок превью картинки */}
                            <div className={styles.previewPhoto}>
                                <input
                                    className={styles.hidden}
                                    ref={ref}
                                    type="file"
                                    onChange={e => setFile(e.target.files[0])}
                                />
                                <Button className={styles.addPhoto} size={'medium'} color={"primary"} onClick={handlePick}>
                                    Добавить фото +
                                </Button>
                                {previewUrl && <Image className={styles.img} src={previewUrl} alt="Preview" width={150} height={150} />}
                            </div>
                            {/*  */}
                            {/* Доделай кнопку с позиции дизейблед */}
                            <Button size={'medium'} color={"primary"} style={{ width: '100%', marginBottom: '24px' }} >
                                Сохранить
                            </Button>
                            <Button size={'medium'} color={"secondary"} style={{ width: '100%', marginBottom: '24px' }} >
                                Заполнить позже
                            </Button>
                        </form>
                    </div>
                </div>
                :
                <Loader />
            }
        </Layout>
    );
};

