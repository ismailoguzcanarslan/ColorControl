import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class ColorControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLDivElement;
    private _inputElement: HTMLInputElement;
    private _context: ComponentFramework.Context<IInputs>;

    /**
     * Bileşen yüklendiğinde çağrılır.
     * @param context CRM context nesnesi
     * @param notifyOutputChanged Çıkış değiştiğinde bildirim için kullanılan metod
     * @param state Kalıcı durum nesnesi
     * @param container Bileşenin render edileceği HTML kapsayıcı öğesi
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this._context = context;
        this._container = container;

        this._inputElement = document.createElement("input");
        this._inputElement.type = "number"; // Tam sayı alanı için
        this._inputElement.className = "color-control-input"; // Stil için sınıf adı
        this._inputElement.readOnly = true; // Sadece okuma amaçlı olabilir, düzenlenebilir olmasını istersen kaldırabilirsin
        this._inputElement.style.border = "none"; // Kenarlığı kaldır
        this._inputElement.style.width = "100%"; // Genişliği kapsayıcıya yay

        this._container.appendChild(this._inputElement);

        this.updateView(context); // İlk render için çağır
    }

    /**
     * Bileşenin görünümü güncellendiğinde çağrılır.
     * @param context CRM context nesnesi
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._context = context;
        const integerValue = context.parameters.integerField.raw; // integerField'dan değeri al

        if (integerValue !== null && integerValue !== undefined) {
            this._inputElement.value = integerValue.toString(); // Değeri input elementine ata

            if (integerValue > 100) {
                this._inputElement.style.backgroundColor = "#90EE90"; // Açık yeşil (LightGreen)
            } else {
                this._inputElement.style.backgroundColor = "#FFA07A"; // Açık turuncu (LightSalmon)
            }
        } else {
            this._inputElement.value = ""; // Değer yoksa boş bırak
            this._inputElement.style.backgroundColor = ""; // Arka plan rengini sıfırla
        }
    }

    /**
     * Bileşen çıkışını döndürür.
     */
    public getOutputs(): IOutputs {
        return {}; // Sadece görüntüleme amaçlı olduğu için çıkışa ihtiyacımız yok
    }

    /**
     * Bileşen kaldırıldığında çağrılır.
     */
    public destroy(): void {
        // Gerekirse temizleme işlemleri burada yapılabilir
    }
}