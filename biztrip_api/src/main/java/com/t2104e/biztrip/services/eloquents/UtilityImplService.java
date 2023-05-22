package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.entities.UtilityEntity;
import com.t2104e.biztrip.repositories.UtilityRepository;
import com.t2104e.biztrip.services.interfaces.IUtilityService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class UtilityImplService implements IUtilityService {
    @Autowired
    private UtilityRepository utilityRepository;

    @Override
    public Page<UtilityEntity> getListUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        return utilityRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
    }

    @Override
    public Optional<UtilityEntity> getOneUtilityById(long id) {
        return utilityRepository.findById(id);
    }

    @Override
    public void deleteUtility(UtilityEntity utility) {
        utilityRepository.delete(utility);
    }

    @Override
    public void saveUtility(UtilityEntity utility) {
        utilityRepository.save(utility);
    }
}
