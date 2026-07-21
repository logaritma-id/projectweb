document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Modal Logic
    const modal = document.getElementById('cta-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const ctaButtons = document.querySelectorAll('.open-modal-btn');

    if (modal && closeModalBtn) {
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Calculator Logic (Praktisi Page)
    const btnHitung = document.getElementById('btn-hitung-skor');
    if (btnHitung) {
        btnHitung.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');

            if (!q1 || !q2 || !q3) {
                alert("Mohon jawab seluruh 3 pertanyaan untuk menghitung skor.");
                return;
            }

            const total = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value);
            const skorAngka = document.getElementById('skor-angka');
            const skorPesan = document.getElementById('skor-pesan');
            const skorResult = document.getElementById('skor-result');

            skorAngka.textContent = total + " / 30";
            
            if (total <= 10) {
                skorAngka.className = "text-5xl font-black text-red-500 font-heading mb-4";
                skorPesan.innerHTML = "Organisasi Anda berada dalam status <strong class='text-red-400'>Bahaya (Silo Parah)</strong>. Sebagian besar anggaran berisiko terbuang untuk kegiatan tanpa dampak.";
            } else if (total <= 20) {
                skorAngka.className = "text-5xl font-black text-yellow-500 font-heading mb-4";
                skorPesan.innerHTML = "Organisasi Anda berstatus <strong class='text-yellow-400'>Transisi</strong>. Ada niat baik menuju outcome, namun sistem keterlacakan (traceability) masih bocor.";
            } else {
                skorAngka.className = "text-5xl font-black text-green-500 font-heading mb-4";
                skorPesan.innerHTML = "Luar biasa! Organisasi Anda berstatus <strong class='text-green-400'>Sehat & Terlacak</strong>. Sistem closed-loop Anda meminimalisir waste anggaran.";
            }

            skorResult.classList.remove('hidden');
            
            // Smooth scroll ke hasil
            skorResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Re-bind modal for the dynamic button inside result
            const modal = document.getElementById('cta-modal');
            const newBtn = skorResult.querySelector('.open-modal-btn');
            if (newBtn && modal) {
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                });
            }
        });
    }

    // Modal Form Simulation (Unduh PDF & Demo)
    const forms = document.querySelectorAll('#cta-modal form');
    forms.forEach(form => {
        const submitBtn = form.querySelector('button[type="button"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const inputs = form.querySelectorAll('input');
                let valid = true;
                inputs.forEach(i => {
                    if (!i.value) valid = false;
                });
                
                if (!valid) {
                    alert("Mohon lengkapi data form terlebih dahulu.");
                    return;
                }
                
                const originalText = submitBtn.textContent;
                submitBtn.textContent = "Memproses...";
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    if (originalText.includes("Unduh")) {
                        alert("Berhasil! File PDF Executive Summary sedang diunduh ke perangkat Anda.");
                        window.open('/assets/docs/Executive-Summary-Metoda-Logaritma.pdf', '_blank');
                    } else {
                        alert("Terima kasih. Tim ahli kami akan menghubungi Anda untuk penjadwalan Demo.");
                    }
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                    
                    const modal = document.getElementById('cta-modal');
                    if (modal) {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        document.body.style.overflow = 'auto';
                    }
                }, 1500);
            });
        }
    });
});
